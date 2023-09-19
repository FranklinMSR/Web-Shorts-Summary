import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"


const filePath = "./tmp/audio.mp4"
const outputPath = filePath.replace(".mp4", ".wav")

export const convert = () =>
  new Promise((resolve, reject) => {
    console.log("Convertendo o vídeo...")

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
    .input(filePath)
    .audioFrequency(16000)
    .audioChannels(1)
    .format("wav")
    .on("end", () => {
        const file = fs.readFileSync(outputPath)
        const fileDecoded = wav.decode(file)

        const audioData = fileDecoded.channelData[0]
        const floatArray = new Float32Array(audioData)

        console.log("Vídeo convertido com sucesso!")

        resolve(floatArray)
        fs.unlinkSync(outputPath)
      })
      .on("error", (error) => {
        console.log("Erro ao converter o vídeo", error)
        reject(error)
      })
      .save(outputPath)
  })

 /*// Converter em .mp3  
// Tell fluent-ffmpeg where it can find FFmpeg
const filePath = "./tmp/audio.mp4"
const outputPath = filePath.replace(".mp4", ".mp3")

export const convert = () =>
  new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg().input(filePath)

    // Run FFmpeg
    ffmpeg()
      // Input file
      //.input("audio.mp4")
      .input(filePath)

      // Audio bit rate
      .outputOptions("-ab", "128k")

      // Output file
      //.saveToFile("audio.mp3")
      .save(outputPath)

      // The callback that is run when FFmpeg is finished
      .on("end", () => {
        console.log("Audio convertido com sucesso!.")
        resolve()
      })

      // The callback that is run when FFmpeg encountered an error
      .on("error", (error) => {
        console.error(error)
        reject(error)
      })
  }) */