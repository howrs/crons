const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const sendDiscordMessage = (
  webhookURL: string,
  message: string | Message,
): Promise<Response> => {
  return fetch(`${webhookURL}?${new URLSearchParams({ wait: "true" })}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      typeof message === "string" ? { content: message } : message,
    ),
  })
    .then<Response>(async (r) => {
      if (r.status === 429) {
        console.error("Failed to send Discord message", await r.json())
        await wait(500)
        return sendDiscordMessage(webhookURL, message)
      }
      return r.json()
    })
    .catch(async (e) => {
      console.error("Failed to send Discord message", message)
      await wait(500)
      return sendDiscordMessage(webhookURL, message)
    })
}

type Message = {
  username: string
  avatar_url: string
  content: string
}

// Generated by https://quicktype.io

interface Response {
  id: string
  type: number
  content: string
  channel_id: string
  author: Author
  attachments: any[]
  embeds: any[]
  mentions: any[]
  mention_roles: any[]
  pinned: boolean
  mention_everyone: boolean
  tts: boolean
  timestamp: string
  edited_timestamp: null
  flags: number
  components: any[]
  webhook_id: string
}

interface Author {
  id: string
  username: string
  avatar: null
  discriminator: string
  public_flags: number
  flags: number
  bot: boolean
}