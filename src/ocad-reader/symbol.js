const Block = require('./block')

module.exports = class Symbol extends Block {
  constructor (buffer, offset) {
    super(buffer, offset)

    this.size = this.readInteger()
    this.symNum = this.readInteger()
    this.otp = this.readByte()
    this.flags = this.readByte()
    this.selected = !!this.readByte()
    this.status = this.readByte()
    this.preferredDrawingTool = this.readByte()
    this.csMode = this.readByte()
    this.csObjType = this.readByte()
    this.csCdFlags = this.readByte()
    this.extent = this.readInteger()
    this.filePos = this.readCardinal()
    this.readByte() // notUsed1
    this.readByte() // notUsed2
    this.nColors = this.readSmallInt()
    this.colors = new Array(14)
    for (let i = 0; i < this.colors.length; i++) {
      this.colors[i] = this.readSmallInt()
    }
    this.description = ''
    for (let i = 0; i < 64; i++) {
      const c = this.readByte()
      if (c) {
        this.description += String.fromCharCode(c)
      }
    }

    this.iconBits = new Array(484)
    for (let i = 0; i < this.iconBits.length; i++) {
      this.iconBits[i] = this.readByte()
    }

    this.symbolTreeGroup = new Array(64)
    for (let i = 0; i < this.symbolTreeGroup.length; i++) {
      this.symbolTreeGroup[i] = this.readWord()
    }
  }
}