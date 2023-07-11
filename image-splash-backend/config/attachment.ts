import { AttachmentConfig } from '@ioc:Adonis/Addons/AttachmentAdvanced'

const attachmentConfig: AttachmentConfig = {
  document: false,
  video: false,
  pdf: false,
  image: {
    variants: {
      thumbnail: {
        resize: 320,
        format: ['jpg', 'png', 'jpeg']
      },
      medium: {
        resize: 640,
        format: ['jpg', 'png', 'jpeg']
      },
      large: {
        resize: 1280,
        format: ['jpg', 'png', 'jpeg']
      }
    }
  }
}

export default attachmentConfig
