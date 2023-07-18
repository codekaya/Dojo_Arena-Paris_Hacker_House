

### Development

Install the latest Dojo toolchain from here [installation guide](https://book.dojoengine.org/getting-started/installation.html)

```bash
# Start Katana
katana --seed 0

# Build the game
sozo build

# Migrate the world, this will declare/deploy contracts to katana,
# update the world address in Scarb.toml
sozo migrate

# Create a game, account credentials are stored in Scarb.toml
sozo execute Create

# Open up another terminal and cd into player_two
sozo execute Join --calldata 0

# View the schema of a component
sozo component schema Game

# View the value of a component
# Depending on how you structure your storage keys the last input
# specifies the key parts
sozo component entity Game 0

# Figure out how to punch, kick, and use special attack to deal a killing blow your opponent!
```
