import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({ region: process.env.AWS_REGION });

export const getSecretValue = async (secretName = "rds/postgres/dog-restaurant/credentials") => {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      })
    );

    if (response.SecretString) {
      return JSON.parse(response.SecretString);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
