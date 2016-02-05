# McMahon v2.0
[![Circle CI](https://circleci.com/gh/opsee/mcmahon.svg?style=shield&circle-token=756e04b601e5f40b69676f2ef7074ae6135b776c)](https://circleci.com/gh/opsee/mcmahon)

![mcmahon](http://www.muscleandfitness.com/sites/muscleandfitness.com/files/styles/full_node_image_1090x614/public/media/vince-mcmahon-back-split.jpg?itok=nBFY807K)

### Getting started
```bash
// Install the dependencies
npm install

// Build the static site. Output will be in dist/
npm run build

// Run the devserver on localhost:8282
npm start
```

### Configuration
Configuration is managed with the [`config`](https://www.npmjs.com/package/config) module. All configuration files can be found in the `config/` directory.

#### Secrets and environment variables
Deployment requires AWS credentials. By default, these will come from export
environment variables named `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

However, environment variables are a pain to work with. Instead, you can create
a [local config file](https://github.com/lorenwest/node-config/wiki/Configuration-Files#file-load-order)
as `config/local.json`. This is already in the `.gitignore` file, so it is safe
for all of your secrets. (All of them.)

A sample `config/local.json` file might look like the following:

```json
{
  "aws": {
    "accessKeyID": "YOUR_KEY_ID_HERE",
    "secretAccessKey": "YOUR_SECRET_HERE",
  }
}
```


### Deploying
First, make sure you've [configured your AWS credentials](#secrets-and-environment-variables). Then:

1. `npm run build` to build the static site in the `dist/` directory
2. `npm run deploy` to upload the static site to S3

To accomplish both at once, use `npm run publish`.