# graphql-hook

### Install

**Only manual install**

Check your $PATH. Maybe you need to add the `$HOME/.local/bin/` to your `$HOME`

```bash
mkdir -p $HOME/.local/bin
```

NodeJS must be installed before all. If not, I suggest [nvm](https://github.com/nvm-sh/nvm).

```bash
bash install.sh
```


### How to use

```bash
gqlhook --port 1337 --endpoint GRAPHQL_API \
--headers 'key:"value"' \
-H 'key:[1,2,3,4,5,6,7]' \
-H 'authorization:{"object": "key", "value": 5}'
```

Parameters:

- `-p, --port [default is 1337]`: the port of local web server to run [graphql playground](https://github.com/prisma-labs/graphql-playground)
- `-e, --endpoint <mandatory>`: the target endpoint to download introspection schema\* and make all queries
- `-H, --headers`: Headers like [curl](https://curl.haxx.se/) `-H` parameter

**\*Sometimes introspection is off in graphql servers**
