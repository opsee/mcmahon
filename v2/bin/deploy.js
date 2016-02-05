const config = require('config');
const s3 = require('s3');
const path = require('path');

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

  console.log('deploying!', params);

  const client = s3.createClient({
    s3Options: {
      accessKeyId: config.aws.accessKeyID,
      accessKeySecret: config.aws.secretAccessKey
    }
  });

  const uploader = client.uploadDir(params);

  uploader.on('fileUploadStart', (localFilePath, s3Key) => {
    console.log('uploading ' + localFilePath);
  });

  uploader.on('error', (err) => {
    console.error("unable to sync:", err.stack);
  });

  uploader.on('progress', function() {
    console.log('files found', uploader.filesFound)
    console.log('deleting ', uploader.deleteAmount, uploader.deleteTotal);
    // console.log("progress", uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  });
}



if (require.main === module) {
  deploy();
} else {
  module.exports = deploy;
}
