const path = require('path');

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      '@components': resolvePath('./src/components'),
      '@data': resolvePath('./src/data'),
      '@pages': resolvePath('./src/pages'),
      '@providers': resolvePath('./src/providers'),
      '@requests': resolvePath('./src/requests'),
      '@routes': resolvePath('./src/routes'),
      '@services': resolvePath('./src/services'),
    }
  },
}
