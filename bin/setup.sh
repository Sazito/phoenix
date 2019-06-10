#!/bin/sh

CODE_DIR=./code
ENV_FILE=.env
ENV_DEV_FILE=.env.development

#
# Copy codes

echo -ne "\n"

if [ -d $CODE_DIR ]
then
    echo -ne "Directory \"${CODE_DIR}\" already exists.\n"
else
    echo -ne "Make \"${CODE_DIR}\" directory\r"
    mkdir code
    sleep 0.5
    echo -ne "Make \"${CODE_DIR}\" directory successful"
    sleep 0.5
    echo -ne "\n"
    sleep 0.5
    echo -ne "Copy \"./code.example/*\" to \"${CODE_DIR}\" directory\r"
    cp -r code.example/* $CODE_DIR
    sleep 0.5
    echo -ne "Copy \"./code.example/*\" to \"${CODE_DIR}\" directory successful"
    sleep 0.5
    echo -ne "\n"
fi

sleep 0.5

#
# Copy env file

if [ -f $ENV_FILE ]
then
    echo -ne "File \"${ENV_FILE}\" already exists.\n"
else
    cp .env.default $ENV_FILE
    echo -ne "Make \"${ENV_FILE}\" file\n"
fi

sleep 0.5

#
# Copy development env file

if [ -f $ENV_DEV_FILE ]
then
    echo -ne "File \"${ENV_DEV_FILE}\" already exists.\n"
else
    cp .env.default $ENV_DEV_FILE
    echo -ne "Make \"${ENV_DEV_FILE}\" file\n"
fi

sleep 0.5

#
# Install packages

if [ -d "node_modules" ]
then
    echo -ne "Directory \"node_modules\" already exists.\n"
    echo -ne "If you want reinstall packages, you can use \"yarn\" command.\n"
else
    echo -ne "Installing Packages\n"
    yarn
fi

echo -ne "\n"
