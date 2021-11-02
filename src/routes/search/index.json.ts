export function get({ query }) {
  const searchQuery = query.get('q')
  let result = [...Array(125).keys()]

  switch (searchQuery) {
    case 'empty':
      result = []
      break
    case 'unique':
      result = [...Array(51).keys()]
      break
  }

  return {
    status: 200,
    body: {
      items: result
    }
  }
}