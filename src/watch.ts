import { ofetch } from "ofetch"
import { sendDiscordMessage } from "./lib/sendDiscrodMessage"

async function main() {
  try {
    const res = await ofetch.raw("https://base.dev")

    if (res.ok) {
      await sendDiscordMessage(
        `https://discord.com/api/webhooks/1250464855643652197/MY4Hr6JMAOvAwq970i41WaxcO1ZuTOeKz8VaBtbIjqXe2xTWXBqbHHfhgKnmeQEe6KhC`,
        `Up (ok)`,
      )
    } else {
      console.log("Failed")
    }
  } catch (e) {
    console.log(e)
  }
}

main()
