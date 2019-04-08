export const rules = {
    name: {
      title: ({ value }) => {
        const matchCase = value.match(/^([a-zA-Z\s]{3,100})$/)
        return matchCase && matchCase.length > 0 ? true : false
      },
      description: ({ value }) => {
        const matchCase = value.match(/^([a-zA-Z\s]{10,1000})$/)
        return matchCase && matchCase.length > 0 ? true : false
      },
      'selection process': ({ value }) => {
        const matchCase = value.match(/^([a-zA-Z\s]{3,100})$/)
        return matchCase && matchCase.length > 0 ? true : false
      },
      salary: ({ value }) => {
        const matchCase = value.match(/^([0-9]{3,10})$/)
        return matchCase && matchCase.length > 0 ? true : false
      },
    },
}