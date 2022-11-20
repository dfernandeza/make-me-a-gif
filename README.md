# make-me-a-gif

A simple CLI tool to convert video files to gif.

It uses [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) which is a pure WebAssembly and JavaScript port of [FFmpeg](http://www.ffmpeg.org/).

## Install

```
npm install @dfernandeza/make-me-a-gif -g
```

Tested with:

- node v16.15.0
- npm v8.5.5

## CLI Usage

```
Usage: make-me-a-gif [options]

Options:
      --version   Show version number                   [boolean]
  -i, --input     the input video directory/name        [string] [required]
  -o, --output    the output gif directory/name         [string] [required] [default: "output.gif"]
  -s, --startAt   starting seconds or offset            [number] [default: "0"]
  -d, --duration  total time of gif                     [number] [default: "5"]
  -w, --width     width dimension of resulting gif      [number] [default: "-1"]
  -h, --height    height dimension of resulting gif     [number] [default: "-1"]
  -f, --fps       frames per second                     [number] [default: "10"]
      --help      Show help                             [boolean]
```

### Example

```
make-me-a-gif -i 'video.mov' -o 'awesome.gif' -s 5 -w 320 -f 20
```

## Contributing

Contributions in any form are highly encouraged and welcome! If you find something wrong please open a [GitHub issue](https://github.com/dfernandeza/make-me-a-gif/issues).
