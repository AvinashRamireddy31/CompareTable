# config-compare
This repo is to automate comparing config and secrets for different environments

### Prerequisites
---------------
Install folowing
- kubectx
- python3
- jq

### Steps
1. create a folder `data`
    ```
    cd data
    ```
1. Generate list of secret and configmap names in text files
    ```
    chmod +x script.sh
    ./script.sh
    ```
2. Start server
    ```
    python3 -m http.server 8080
    ```
3. Navigate to `secrets.html` to see secrets
4. Navigate to `configs.html` to see configmaps
