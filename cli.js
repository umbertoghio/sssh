#!/usr/bin/env node

const config = require(process.env['HOME'] + '/.sssh.json')
const ipt = require('ipt')
const out = require('simple-output')
const { execSync } = require('child_process')

// Exits program execution on ESC
process.stdin.on('keypress', (ch, key) => { key && key.name === 'escape' && process.exit(0) })

const forwardParam = ({portForward = false}) => !portForward ? ''
  : portForward.split(',').map(pf => `-L ${pf.trim()}:127.0.0.1:${pf.trim()}`).join(' ')

const input = config.map((el) => ({
  name: `${el.name}: ${el.description}`,
  value: `ssh ${el.key ? `-i ${el.key}` : ''}${el.port ? `-p ${el.port}` : ''} ${forwardParam(el)} ${el.username}@${el.host}`
}))

const options = {
  message: 'Select SSH connection', 
  autocomplete: true,
  multiple: false,
  size: input.length
}

const executeSsh = (command) => {
  out.success('launching ' + command)
  execSync(`"${command}"`, {
      cwd: process.cwd(),  
      stdio: [process.stdin, process.stdout, process.stderr]
    })
}

// creates interactive interface using ipt
out.success('Simple SSH Connection Handler')
ipt(input, options)
  .then(executeSsh)
  .catch(err => { out.error(err) })
