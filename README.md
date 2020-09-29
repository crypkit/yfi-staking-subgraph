# Yfi Staking Subgraph

A subgraph indexing the following events on YearnGovernance [contract](https://etherscan.io/address/0xBa37B002AbaFDd8E89a1995dA52740bbC013D992#code): 
- Staked(address indexed user, uint amount)
- Withdrawn(address indexed user, uint amount)
- RewardPaid(address indexed user, uint reward)

### Compilation and deployment

1. Install the dependencies:
    ```bash
    npm install
    ```
2. Generate the types:
    ```bash
    npm run codegen
    ```
3. Authenticate yourself:
    ```bash
    graph auth https://api.thegraph.com/deploy/ <ACCESS_TOKEN>
    ```
3. Deploy:
    ```bash
    npm run deploy
    ```