from fabric.api import *
import fabric.contrib.project as project
 
def clean():
  local('rm -rf ./deploy')
 
def regen():
  clean()
  local('hyde gen')
  
 
def serve():
  local('hyde serve')
 
def cgs():
  regen()
  serve()
 
@hosts('jwmcmanus@jmcman.us')
def publish():
  regen()
  project.rsync_project(
    remote_dir='/home/jwmcmanus/jmcman.us',
    local_dir='deploy/',
    delete=True
  )