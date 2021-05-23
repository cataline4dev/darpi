import { Locales } from './models/Locales'
import { Messages, PartialMessages } from './models/Messages'
import ptBR from './messages/pt_BR'

export interface Config {
  locale: Locales
  messages: Messages
}

export let currentConfig: Config = {
  locale: 'pt-BR' as Locales,
  messages: ptBR
}

interface PartialMessages2 {
  messages: PartialMessages
}

type NewConfig = Partial<Omit<Config, 'messages'> & PartialMessages2>

const configure = (newConfig: NewConfig) => {
  let messages: Messages = currentConfig.messages

  // if (newConfig.locale && newConfig.locale !== currentConfig.locale) {
  //   messages = await import(`@/messages/${newConfig.locale}`)
  // }

  newConfig.messages = { ...messages, ...newConfig.messages }

  currentConfig = { ...currentConfig, ...(newConfig as any) }
}

export default configure
