from fabric.api import *
import fabric.contrib.project as project

def clean():
  local('rm -rf ./deploy')

def regen():
  clean()
  local('hyde gen')
  local('grunt')


def serve():
  local('hyde serve')

def cgs():
  regen()
  serve()
