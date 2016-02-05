const config = require('config');
const s3 = require('s3');
const path = require('path');
const colors = require('colors');

function deploy() {
  const params = {
    localDir: path.join(__dirname, '..', config.staticDir),
    // remove s3 objects that have no corresponding local file.
    deleteRemoved: true,
    s3Params: {
      Bucket: config.aws.bucket,
      Prefix: ''
    }
  };

  const client = s3.createClient({
    s3Options: {
      accessKeyId: config.aws.accessKeyID,
      accessKeySecret: config.aws.secretAccessKey
    }
  });

  const uploader = client.uploadDir(params);

  uploader.on('error', (err) => {
    console.error("unable to sync:", err.stack);
  });

  uploader.on('progress', () => {
    process.stdout.write(".");
  });

  uploader.on('end', function() {
    console.log('\n', 'done uploading!'.green);
  });
}



if (require.main === module) {
  deploy();
} else {
  module.exports = deploy;
}
