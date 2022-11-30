// imports
const licenseData = require('../lib/licenseDatabase.json'); // import our json file containing the license data

// function that either returns the license link or an empty string
function renderLicenseLink(licenseInput) {
  if (!licenseInput) return ''; // if there is no license, return empty string
  const licenseUrl = licenseData.licenseRoot + licenseInput.endpoint; // obtain license link from our database
  return licenseUrl; // return license link
}

// function that either returns the appropriate license badge or an empty string
function renderLicenseBadge(licenseInput) {
  if (!licenseInput) return ''; // if there is no license, return empty string
  const badgeURL = licenseData.badgeTemplate.replace( // obtain badge template link from our database and assign it to the badgeURL variable
    '@name', licenseInput.endpoint).replace('@color', licenseInput.badgeColor); // replace the endpoint and color placeholders in the link with our data
  const licenseLinks = `[![License: ${licenseInput.name}](${badgeURL})](${renderLicenseLink(licenseInput)})`; // create string literal with the license name, badge link, and license link
  return licenseLinks; // return string literal with license link information
}

// function that either returns the license section of the README or an empty string
function renderLicenseSection(licenseInput) {
  if (!licenseInput) return ''; // if there is no license, return empty string
  const licenseDescriptor = licenseInput.default ? `\n${licenseInput.info}` : // if licenseInput.default is true, set to licenseinput.info (because that means the 'no-license' license was inputted)
    `\n  This application is distributed under the [${licenseInput.name}](${renderLicenseLink(licenseInput)}) license.` // if licenseInput.default doesn't exist, generate a new license info field

  const finalLicenseInfo = renderLicenseBadge(licenseInput) + licenseDescriptor; // combine the license badge and license descriptor into one section of information
  return finalLicenseInfo; // return combined section
}

// function that generates the markdown
function generateMarkdown(readmeInput) {
  const licenseInformation = licenseData.licenseInfo.find(
    choiceData => choiceData.name === readmeInput.license); // locate the appropriate license type by comparing each license type in the json by name

  // create string literal with generated markdown
  // when renderLicenseSection is called, it passes the appropriate licenses data to the chain of sub-functions
  const generatedMarkdown = `
  # ${readmeInput.title}
  ## Description
  ${readmeInput.description}
  ## License
  ${renderLicenseSection(licenseInformation)}
  ## Table of Contents
  - [License](#License)
  - [Usage](#Usage)
  - [Installation](#Installation)
  - [Testing](#Testing)
  - [Contributing](#Contributing)
  ## Usage
  ${readmeInput.usage}
  ## Installation
  ${readmeInput.installation}
  ## Testing
  ${readmeInput.tests}
  ## Contributing
  ${readmeInput.contributing}
  ## Questions
  Github:<https://github.com/${readmeInput.user}>
  \n  Email: ${readmeInput.email}
  `;
  
  return generatedMarkdown; // return string literal with finalized markdown
}

// test data and function call for testing
/*
 testData = {
  title: 'd',
  description: 'd',
  installation: 'd',
  usage: 'd',
  contributing: 'd',
  tests: 'd',
  user: 'd',
  email: 'd',
  license: 'MIT'
};
testData2 = {
  title: 'd',
  description: 'd',
  installation: 'd',
  usage: 'd',
  contributing: 'd',
  tests: 'd',
  user: 'd',
  email: 'd',
  license: 'No License'
};
generateMarkdown(testData);
console.log('==================================================================');
generateMarkdown(testData2);
*/

// export generateMarkdown function
module.exports = generateMarkdown;

// TODO:
// generate readme for project
// make video of program in action