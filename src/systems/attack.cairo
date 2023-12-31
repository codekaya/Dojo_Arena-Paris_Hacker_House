#[derive(Serde, Copy, Drop, PartialEq)]
enum Action {
    Punch: (),
    Kick: (),
    Special: (),
}

#[system]
mod Attack {
    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::Into;
    use super::Action;

    use dojo::world::Context;

    use enter_the_dojo::events::emit;
    use enter_the_dojo::components::game::{Game, GameTrait};
    use enter_the_dojo::components::player::{Health, Special};
    use enter_the_dojo::constants::{
        PUNCH_DAMAGE, KICK_DAMAGE, SPECIAL_DAMAGE, PUNCH_CHANCE, KICK_CHANCE, SPECIAL_CHANCE
    };

    #[derive(Drop, Serde)]
    struct PlayerAttacked {
        game_id: u32,
        player_id: felt252,
        opponent_id: felt252,
        action: Action,
        damage: u8,
    }

    #[derive(Drop, Serde)]
    struct GameOver {
        game_id: u32,
        winner: felt252,
        loser: felt252,
    }

    fn execute(ctx: Context, game_id: u32, action: Action) {
        // gets player address
        let player_id: felt252 = ctx.origin.into();

        // read game entity
        let game_sk: Query = game_id.into();
        let game = get !(ctx.world, game_sk, Game);

        // game condition checking
        assert(game.winner == 0, 'game already over');
        assert(game.next_to_move == player_id, 'not your turn');

        // only retrieve own player's special component
        // we don't care about health component as it does 
        // not get updated
        let player_sk: Query = (game_id, player_id).into();
        let special = get !(ctx.world, player_sk, Special);

        // check if attack is special and is valid
        if action == Action::Special(()) {
            assert(special.remaining > 0, 'no specials left');

            set !(ctx.world, player_sk, (Special { remaining: special.remaining - 1 }));
        }

        // cacluate damage, use VRF for seed in the future
        let seed = starknet::get_tx_info().unbox().transaction_hash;
        let mut damage = calculate_damage(seed, action);

        // opposing player
        let opponent_id = if game.player_one == player_id {
            game.player_two
        } else {
            game.player_one
        };
        // only retrieve health for opponent player as their 
        // special component does not get updated
        let opponent_sk: Query = (game_id, opponent_id).into();
        let health = get !(ctx.world, opponent_sk, Health);

        // check if killing blow
        let killing_blow = if damage >= health.amount {
            damage = health.amount;
            true
        } else {
            false
        };

        // update opponent health
        set !(ctx.world, opponent_sk, (Health { amount: health.amount - damage }));

        // update game state
        set !(
            ctx.world,
            game_sk,
            (Game {
                player_one: game.player_one,
                player_two: game.player_two,
                next_to_move: opponent_id,
                num_moves: game.num_moves + 1,
                winner: if killing_blow {
                    player_id
                } else {
                    0
                }
            })
        );

        let mut values = array::ArrayTrait::new();
        serde::Serde::serialize(
            @PlayerAttacked { game_id, player_id, opponent_id, action, damage }, ref values
        );
        emit(ctx, 'PlayerAttacked', values.span());

        if killing_blow {
            let mut values = array::ArrayTrait::new();
            serde::Serde::serialize(
                @GameOver { game_id, winner: player_id, loser: opponent_id }, ref values
            );
            emit(ctx, 'GameOver', values.span());
        }
    }

    fn calculate_damage(seed: felt252, action: Action) -> u8 {
        match action {
            Action::Punch(()) => chance_hit(seed, PUNCH_CHANCE, PUNCH_DAMAGE),
            Action::Kick(()) => chance_hit(seed, KICK_CHANCE, KICK_DAMAGE),
            Action::Special(()) => chance_hit(seed, SPECIAL_CHANCE, SPECIAL_DAMAGE),
        }
    }

    fn chance_hit(seed: felt252, likelihood: u8, damage: u8) -> u8 {
        let seed: u256 = seed.into();
        let result: u128 = seed.low % 100;

        if result <= likelihood.into() {
            damage
        } else {
            0
        }
    }
}

