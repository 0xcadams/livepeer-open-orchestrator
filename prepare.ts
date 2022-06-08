import fs from 'fs';
import path from 'path';
import regions from 'aws-regions';
import mustache from 'mustache';

const main = async () => {
  const awsRegion = process.env.AWS_REGION;
  const projectName = process.env.PROJECT_NAME;
  const isPrimaryCluster = process.env.IS_PRIMARY_CLUSTER === 'true';

  const eksFileTemplate = isPrimaryCluster
    ? 'eksctl.primary.mustache.yaml'
    : 'eksctl.mustache.yaml';

  if (!awsRegion || !projectName) {
    throw new Error('You must define all environment variables.');
  }
  if (!regions.lookup({ code: awsRegion })) {
    throw new Error('The AWS_REGION you provided is not a valid value. Please try again.');
  }

  // configure w/ more supporting nodes for "main" region and less for others
  const generalPodCapacity = isPrimaryCluster ? 2 : 1;
  const largePodCapacity = isPrimaryCluster ? 1 : 0;

  const source = await fs.readFileSync(eksFileTemplate, 'utf-8');

  const result = mustache.render(source, {
    region: awsRegion,
    projectName,
    largePodCapacity,
    generalPodCapacity
  });

  await fs.writeFileSync(path.join(__dirname, 'eksctl.yaml'), result);
};

main()
  .then(() => console.log('Config created.'))
  .catch((e) => console.error(e));
