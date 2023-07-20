
const abi = [
    {
      "name": "constructor",
      "type": "function",
      "inputs": [],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "wen_dojo_arena",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "type": "core::felt252"
        }
      ],
      "state_mutability": "view"
    },
    {
      "name": "get_random_seed",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "type": "core::integer::u128"
        }
      ],
      "state_mutability": "view"
    },
    {
      "name": "get_time_stamp",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "type": "core::integer::u64"
        }
      ],
      "state_mutability": "view"
    },
    {
      "name": "get_owner",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ],
      "state_mutability": "view"
    },
    {
      "name": "get_game_manager",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ],
      "state_mutability": "view"
    },
    {
      "name": "get_game_count",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "type": "core::integer::u256"
        }
      ],
      "state_mutability": "view"
    },
    {
      "name": "dojo_arena::contract::dojo_arena::Game",
      "type": "struct",
      "members": [
        {
          "name": "name",
          "type": "core::felt252"
        },
        {
          "name": "nft_collection_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "winner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "game_creator",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "turn_duration",
          "type": "core::integer::u64"
        },
        {
          "name": "max_players",
          "type": "core::integer::u16"
        },
        {
          "name": "num_players",
          "type": "core::integer::u16"
        },
        {
          "name": "start_time",
          "type": "core::integer::u64"
        },
        {
          "name": "initial_hp",
          "type": "core::integer::u16"
        },
        {
          "name": "hunger_level",
          "type": "core::integer::u16"
        },
        {
          "name": "is_active",
          "type": "core::bool"
        },
        {
          "name": "current_tour",
          "type": "core::integer::u8"
        },
        {
          "name": "prize",
          "type": "core::integer::u256"
        },
        {
          "name": "place_holder",
          "type": "core::integer::u256"
        },
        {
          "name": "entry_fee",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "name": "get_game",
      "type": "function",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [
        {
          "type": "dojo_arena::contract::dojo_arena::Game"
        }
      ],
      "state_mutability": "view"
    },
    {
      "name": "dojo_arena::contract::dojo_arena::Player",
      "type": "struct",
      "members": [
        {
          "name": "health",
          "type": "core::integer::u16"
        },
        {
          "name": "name",
          "type": "core::felt252"
        },
        {
          "name": "pixel_heroes_id",
          "type": "core::integer::u16"
        },
        {
          "name": "address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "nft_collection_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "nft_collection_token_id",
          "type": "core::integer::u16"
        },
        {
          "name": "move_turn",
          "type": "core::integer::u8"
        },
        {
          "name": "is_alive",
          "type": "core::bool"
        },
        {
          "name": "move",
          "type": "core::integer::u8"
        }
      ]
    },
    {
      "name": "get_player",
      "type": "function",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "player_id",
          "type": "core::integer::u16"
        }
      ],
      "outputs": [
        {
          "type": "dojo_arena::contract::dojo_arena::Player"
        }
      ],
      "state_mutability": "view"
    },
    {
      "name": "create_game",
      "type": "function",
      "inputs": [
        {
          "name": "_name",
          "type": "core::felt252"
        },
        {
          "name": "_nft_collection_address",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "_turn_duration",
          "type": "core::integer::u64"
        },
        {
          "name": "_max_players",
          "type": "core::integer::u16"
        },
        {
          "name": "_start_time",
          "type": "core::integer::u64"
        },
        {
          "name": "_entry_fee",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "join_game",
      "type": "function",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "_name",
          "type": "core::felt252"
        },
        {
          "name": "_pixel_heroes_id",
          "type": "core::integer::u16"
        },
        {
          "name": "_nft_collection_token_id",
          "type": "core::integer::u16"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "set_game_manager",
      "type": "function",
      "inputs": [
        {
          "name": "address",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "start_game",
      "type": "function",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "hunt",
      "type": "function",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "player_id",
          "type": "core::integer::u16"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "hide",
      "type": "function",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "player_id",
          "type": "core::integer::u16"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "attack",
      "type": "function",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "player_id",
          "type": "core::integer::u16"
        },
        {
          "name": "attack_to_player_id",
          "type": "core::integer::u16"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "next_turn",
      "type": "function",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "end_game",
      "type": "function",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "withdraw",
      "type": "function",
      "inputs": [
        {
          "name": "amount",
          "type": "core::integer::u256"
        }
      ],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "withdraw_max",
      "type": "function",
      "inputs": [],
      "outputs": [],
      "state_mutability": "external"
    },
    {
      "name": "game_created",
      "type": "event",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "game",
          "type": "dojo_arena::contract::dojo_arena::Game"
        },
        {
          "name": "creator",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "name": "player_joined",
      "type": "event",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "player_id",
          "type": "core::integer::u16"
        },
        {
          "name": "player",
          "type": "dojo_arena::contract::dojo_arena::Player"
        },
        {
          "name": "address",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "name": "game_started",
      "type": "event",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "name": "attacked",
      "type": "event",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "player_id",
          "type": "core::integer::u16"
        },
        {
          "name": "attacked_player_id",
          "type": "core::integer::u16"
        },
        {
          "name": "result",
          "type": "core::integer::u8"
        }
      ]
    },
    {
      "name": "hided",
      "type": "event",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "player_id",
          "type": "core::integer::u16"
        }
      ]
    },
    {
      "name": "hunted",
      "type": "event",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "player_id",
          "type": "core::integer::u16"
        },
        {
          "name": "result",
          "type": "core::integer::u8"
        }
      ]
    },
    {
      "name": "on_next_turn",
      "type": "event",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "name": "player_dead",
      "type": "event",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        },
        {
          "name": "player_id",
          "type": "core::integer::u16"
        }
      ]
    },
    {
      "name": "game_ended",
      "type": "event",
      "inputs": [
        {
          "name": "game_id",
          "type": "core::integer::u256"
        }
      ]
    }
  ]
export const hunt = async (_contract, starknet, game_id, player_id) => {
    //const price = await getPublicPrice(_contract);
    const { transaction_hash } = await starknet.account.execute(
        [
            {
                contractAddress: "0x025c54cc9d49825338dfe117e4bbe94ac7bf006679f2cd0c50c3cba25457b24fs",
                entrypoint: "hunt",
                calldata: [game_id, player_id]
            }
        ]
    )
    console.log(transaction_hash)
}
export const hide = async (_contract, starknet, game_id, player_id) => {
    //const price = await getPublicPrice(_contract);
    const { transaction_hash } = await starknet.account.execute(
        [
            {
                contractAddress: "0x025c54cc9d49825338dfe117e4bbe94ac7bf006679f2cd0c50c3cba25457b24f",
                entrypoint: "hide",
                calldata: [game_id, player_id]
            }
        ]
    )
    console.log(transaction_hash)
}
export const attack = async (_contract, starknet, game_id, player_id) => {
    //const price = await getPublicPrice(_contract);
    const { transaction_hash } = await starknet.account.execute(
        [
            {
                contractAddress: "0x025c54cc9d49825338dfe117e4bbe94ac7bf006679f2cd0c50c3cba25457b24f",
                entrypoint: "attack",
                calldata: [game_id, player_id]
            }
        ]
    )
    console.log(transaction_hash)
}