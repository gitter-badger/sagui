import fs from 'fs-extra'
import path from 'path'
import { expect } from 'chai'
import sagui from '.'

describe('sagui', function () {
  describe('simple project', () => {
    const projectFixture = path.join(__dirname, '../spec/fixtures/simple-project')
    const projectPath = path.join(__dirname, '../tmp/project')

    beforeEach(function () {
      fs.emptyDirSync(projectPath)
      fs.copySync(projectFixture, projectPath)
    })

    it('should configure webpack', () => {
      const webpack = sagui({ projectPath }).webpack
      expect(webpack.length).to.equal(1)
    })

    it('should configure karma', () => {
      const karma = sagui({ projectPath }).karma
      expect(karma.webpack).to.exist
    })

    describe('after install', () => {
      beforeEach(() => {
        sagui({ projectPath, action: 'install' }).run()
      })

      it('should be possible to build', () => {
        return sagui({ projectPath, action: 'build' }).run()
      })

      it('should be possible to test', () => {
        return sagui({ projectPath, action: 'test' }).run()
      })

      it('should be possible to lint', () => {
        return sagui({ projectPath, action: 'lint' }).run()
      })
    })
  })
})
