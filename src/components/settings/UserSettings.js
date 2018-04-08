const name = `termsUserSettings`

class UserSettings {

  settings = {
    showDefinitionsAndAnswers: false
  }

  getSettings() {
    return JSON.parse(window.localStorage.getItem(name)) || this.settings
  }

  saveSettings(settings) {
    window.localStorage.setItem(name, JSON.stringify(settings))
    return true
  }

}

export default new UserSettings()
