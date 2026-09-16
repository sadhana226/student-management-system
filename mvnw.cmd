@echo off
@setlocal
cd /d "%~dp0\backend"
java -classpath "%~dp0\backend\.mvn\wrapper\maven-wrapper.jar" org.apache.maven.wrapper.MavenWrapperMain %*
