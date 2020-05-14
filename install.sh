function existNode {
    mkdir -p $HOME/.local/bin
    npm i -g typescript@latest && tsc && ln -sf $PWD/dist/index.js $HOME/.local/bin/gqlhook
}

test -e "$(which node)" && existNode || echo "Vai dar não"