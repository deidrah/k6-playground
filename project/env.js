let SERVER_INT_URL = ""
let SERVER_DEV_URL = ""
let SERVER_PROD_URL = ""

//DEV URL
export let devEnvironment = {
  SERVER_ENDPOINT: SERVER_DEV_URL
}

//PROD URL
export let prodEnvironment = {
  SERVER_ENDPOINT: SERVER_PROD_URL
}

//int URL
export let intEnvironment = {
  SERVER_ENDPOINT: SERVER_INT_URL
}

export let int = "int"
export let dev = "dev"
export let prod = "prod"