import fs from 'fs';
import path from 'path';
import regions from 'aws-regions';
import mustache from 'mustache';

const eksFileTemplate = 'eksctl.mustache.yaml';

const main = async () => {
  const awsRegion = process.env.AWS_REGION;
  const githubUser = process.env.GITHUB_USER;
  const githubRepo = process.env.GITHUB_REPO;

  if (!awsRegion || !githubRepo || !githubUser) {
    throw new Error('You must define all environment variables.');
  }
  if (!regions.lookup({ code: awsRegion })) {
    throw new Error('The AWS_REGION you provided is not a valid value. Please try again.');
  }

  const source = await fs.readFileSync(eksFileTemplate, 'utf-8');

  const result = mustache.render(source, {
    region: awsRegion,
    githubUser,
    githubRepo
  });

  await fs.writeFileSync(path.join(__dirname, 'eksctl.yaml'), result);
};

main()
  .then(() => console.log('Config created.'))
  .catch((e) => console.error(e));
