#!/usr/bin/env node

import fs from 'fs/promises';
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const yargs = _yargs(hideBin(process.argv));

async function getFFmpeg() {
  const ffmpegInstance = createFFmpeg({ log: false });

  await ffmpegInstance.load();
  return ffmpegInstance;
}

const OPTIONS = {
  input: {
    alias: 'i',
    demandOption: true,
    describe: 'the input video directory/name',
    type: 'string',
  },
  output: {
    alias: 'o',
    demandOption: true,
    default: 'output.gif',
    describe: 'the output gif directory/name',
    type: 'string',
  },
  startAt: {
    alias: 's',
    default: '0',
    describe: 'starting seconds or offset',
    type: 'number',
  },
  duration: {
    alias: 'd',
    default: '5',
    describe: 'total time of gif',
    type: 'number',
  },
  width: {
    alias: 'w',
    default: '-1',
    describe: 'width dimension of resulting gif',
    type: 'number',
  },
  height: {
    alias: 'h',
    default: '-1',
    describe: 'height dimension of resulting gif',
    type: 'number',
  },
  fps: {
    alias: 'f',
    default: '10',
    describe: 'frames per second',
    type: 'number',
  },
};

const argv = yargs
  .scriptName('make-me-a-gif')
  .usage('Usage: $0 [options]')
  .options(OPTIONS)
  .epilog('Enjoy!')
  .help().argv;

console.info(chalk.cyanBright('⏳ Loading ffmpeg...'));

getFFmpeg()
  .then(async (ffmpeg) => {
    const {
      input: inputFileName,
      output: outputFileName,
      startAt,
      duration,
      width,
      height,
      fps,
    } = argv;

    console.info(chalk.cyanBright('📀 Reading video file...'));
    const videoFile = await fetchFile(`./${inputFileName}`);

    ffmpeg.FS('writeFile', inputFileName, videoFile);

    console.info(chalk.cyanBright('⚙️  Making you a gif...'));
    await ffmpeg.run(
      '-ss', // starting seconds or offset
      `${startAt}`,
      '-t', // total time of gif
      `${duration}`,
      '-i', // input file url
      inputFileName,
      '-vf', // video filter
      `fps=${fps},scale=${width}:${height}:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`, //  10 frames per second, size w:h
      '-f', // force output file format
      'gif',
      '-loop',
      '0',
      outputFileName
    );

    await fs.writeFile(outputFileName, ffmpeg.FS('readFile', outputFileName));

    console.info(chalk.cyanBright('🎉 Done!'));
    process.exit(0);
  })
  .catch((error) => {
    console.error(chalk.red('💥 Something went wrong!', error.message));
    process.exit(0);
  });
