import fs from 'fs';
import path from 'path';
import regions from 'aws-regions';
import mustache from 'mustache';

const eksFileTemplate = 'eksctl.mustache.yaml';

const main = async () => {
  const awsRegion = process.env.AWS_REGION;
  const projectName = process.env.PROJECT_NAME;
  const isMainRegion = Boolean(process.env.IS_MAIN_REGION);

  if (!awsRegion || !projectName) {
    throw new Error('You must define all environment variables.');
  }
  if (!regions.lookup({ code: awsRegion })) {
    throw new Error('The AWS_REGION you provided is not a valid value. Please try again.');
  }

  // configure w/ 3 supporting nodes for "main" region and 1 for others
  const generalPodCapacity = isMainRegion ? 3 : 1;

  const source = await fs.readFileSync(eksFileTemplate, 'utf-8');

  const result = mustache.render(source, {
    region: awsRegion,
    projectName,
    generalPodCapacity
  });

  await fs.writeFileSync(path.join(__dirname, 'eksctl.yaml'), result);
};

main()
  .then(() => console.log('Config created.'))
  .catch((e) => console.error(e));
