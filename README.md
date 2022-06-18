# Dora-KSM Parachain React App
> This is a core pallet web app of Dora-KSM Parachain based on React
## Assets
manage your multi-asset

## Rewards
claim reward


## prepare your local test network
> start you chain, default serve at port 8844    
you can change some config in the directory `/context/config/`

```
{
  ...
  ...
  "DORA_KSM_PARACHAIN_EXPLORE": "https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.dorafactory.org#/accounts",
  "REWARD_QUERY": "https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A8844#/explorer/query/",
  "HRMP_DOC": ""
}
```

## Using steps
```javascript
yarn install
```

> Development mode
```
yarn start 
```

> production mode
```
yarn build
```

>local test listen localhost:3000