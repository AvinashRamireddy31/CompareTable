function get_config_and_secrets() {
  cluster=$1
  namespace=$2
  echo "cluster is $cluster and namespace is $namespace"

  kubectx $cluster

  kubectl get secrets --context $cluster -n $namespace -o json |  jq -r '["Name","Keys"], (.items[] | select(.data!=null) | [.metadata.name, (.data | keys | join(","))] ) | @csv' > data/secrets-$namespace.csv
  # code data/secrets-$namespace.csv

  kubectl get configmaps --context $cluster -n $namespace -o json |  jq -r '["Name","Keys"], (.items[] | select(.data!=null) | [.metadata.name, (.data | keys | join(","))] ) | @csv' > data/configmaps-$namespace.csv
  # code data/configmaps-$namespace.csv
}

dev_cluster='AKS-DEV'
dev_namespace='dev'
get_config_and_secrets $dev_cluster $dev_namespace

uat_cluster='AKS--ACC'
uat_namespace='uat'
get_config_and_secrets $uat_cluster $uat_namespace

blue_cluster='AKS-PROD-BLUE'
blue_namespace='prod-blue'
get_config_and_secrets $blue_cluster $blue_namespace

green_cluster='AKS-PROD-GREEN'
green_namespace='prod-green'
get_config_and_secrets $green_cluster $green_namespace
