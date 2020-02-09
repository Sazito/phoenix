#!/bin/sh

CODE_DIR=./code
ENV_FILE=.env
ENV_DEV_FILE=.env.development

#
# Copy codes

printf "\n"

if [ -d $CODE_DIR ]
then
    printf "Directory \"${CODE_DIR}\" already exists.\n"
else
    printf "Make \"${CODE_DIR}\" directory\r"
    mkdir ${CODE_DIR}
    sleep 0.5
    printf "Make \"${CODE_DIR}\" directory successful"
    sleep 0.5
    printf "\n"
    sleep 0.5
    printf "Copy \"./code.example/*\" to \"${CODE_DIR}\" directory\r"
    cp -r code.example/* $CODE_DIR
    sleep 0.5
    printf "Copy \"./code.example/*\" to \"${CODE_DIR}\" directory successful"
    sleep 0.5
    printf "\n"
fi

sleep 0.5

#
# Copy env file

if [ -f $ENV_FILE ]
then
    printf "File \"${ENV_FILE}\" already exists.\n"
else
    cp .env.default $ENV_FILE
    printf "Make \"${ENV_FILE}\" file\n"
fi

sleep 0.5

#
# Copy development env file

if [ -f $ENV_DEV_FILE ]
then
    printf "File \"${ENV_DEV_FILE}\" already exists.\n"
else
    cp .env.default $ENV_DEV_FILE
    printf "Make \"${ENV_DEV_FILE}\" file\n"
fi

sleep 0.5

#
# Install packages

if [ -d "node_modules" ]
then
    printf "Directory \"node_modules\" already exists.\n"
    printf "If you want reinstall packages, you can use \"yarn\" command.\n"
else
    printf "Installing Packages\n"
    yarn
fi

if [ -d "${CODE_DIR}/node_modules" ]
then
    printf "Directory \"${CODE_DIR}/node_modules\" already exists.\n"
    printf "If you want reinstall packages, you can use \"yarn\" command.\n"
else
    printf "Installing \"${CODE_DIR}\" Packages\n"
    cd ${CODE_DIR}
    yarn
    cd ../
fi

printf "\n"
