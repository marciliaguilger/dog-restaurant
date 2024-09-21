import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

   const client = new AWS.SecretsManager({
     region: process.env.AWS_REGION
   });

   async function getSecretValue(secretName: string): Promise<any> {
     try {
       const data = await client.getSecretValue({ SecretId: secretName }).promise();
       if ('SecretString' in data) {
         return JSON.parse(data.SecretString);
       } else {
         const buff = Buffer.from(data.SecretBinary as string, 'base64');
         return JSON.parse(buff.toString('ascii'));
       }
     } catch (err) {
       console.error(err);
       throw err;
     }
   }

   export async function loadSecretsToEnv(secretName: string): Promise<void> {
     const secrets = await getSecretValue(secretName);
     for (const key in secrets) {
       process.env[key] = secrets[key];
     }
   }