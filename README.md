# Casino Royale

_“A martini. Shaken, not stirred.” - Adrian at 2am._

## Getting started

**Requirements:**

- Node (v10 and above)
- NPM (v.7.5.x and above)

### Installation

For the latest build and a fresh typescript compilation, run:

```Bash
npm run install:bin
```

In the case of typescript not being installed, a `build` has been pushed to the repository, but may not be the latest JS version of the code. To use that, run:

```Bash
npm run install:lite
```

### Usage

Now the CLI app will be linked to your local environment, and available for use as `casinoroyale`. Use `casinoroyale -h` for help. Here is an example usage:

```Bash
casinoroyale -f docs/poker-hands.txt
```

This example uses the test file available in the repo's docs folder, but you can use any other file with a valid set of poker hands.

### Running on Docker

If you'd rather not install the CLI to your global environment, there is a Dockerfile in the repo. To use the CLI through Docker, run these commands:

```Bash
docker build -t casinoroyale .
docker run casinoroyale --f docs/poker-hands.txt
```

## Resources

These are the articles I've read to help me build this tool.

- https://stackabuse.com/reading-a-file-line-by-line-in-node-js/

- https://dev.to/christopherkade/building-a-cli-with-yargs-ip8

- https://dev.to/aaronktberry/make-your-cli-app-more-portable-with-docker-dgo
