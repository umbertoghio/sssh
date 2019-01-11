#!/usr/bin/env node

const config = require(process.env['HOME'] + '/.sssh.json')
const ipt = require('ipt')
const out = require('simple-output')
const { execSync } = require('child_process')

const input = config.map(el => {
  const name = `${el.name}: ${el.description}`
  const forward = el.portForward ? `-L ${el.portForward}:127.0.0.1:${el.portForward}` : ''
  const key = el.key ? `-i ${el.key}` : ''
  const value = `ssh ${key} ${forward} ${el.username}@${el.host}`
  return { name, value }
})

// Exits program execution on ESC
process.stdin.on('keypress', (ch, key) => { key && key.name === 'escape' && process.exit(0) })

const options = {
  message: 'Select SSH connection',
  autocomplete: true,
  multiple: false,
  size: input.length
}

out.success('Simple SSH Connection Handler')

// creates interactive interface using ipt
ipt(input, options).then(command => {
  out.success('launching ' + command)
  execSync(`"${command}"`, {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr]
  })
}).catch(err => { out.error(err) })
