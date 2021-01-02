import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
