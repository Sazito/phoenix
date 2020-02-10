#!/bin/sh

CODE_DIR=./code
ENV_FILE=.env
ENV_DEV_FILE=.env.development

#
# Delete codes

printf "\n"

if [ -d $CODE_DIR ]
then
    rm -rf $CODE_DIR
    sleep 0.5
    printf "Directory \"${CODE_DIR}\" deleted successfully.\n"
else
    printf "Directory \"${CODE_DIR}\" does not exists.\n"
fi

sleep 0.5

#
# Delete node_modules

if [ -d "node_modules" ]
then
    rm -rf node_modules
    sleep 0.5
    printf "Directory \"node_modules\" deleted successfully.\n"
else
    printf "Directory \"node_modules\" does not exists.\n"
fi

sleep 0.5

#
# Delete env file

if [ -f $ENV_FILE ]
then
    rm $ENV_FILE
    printf "File \"${ENV_FILE}\" deleted successfully.\n"
else
    printf "File \"${ENV_FILE}\" does not exists.\n"
fi

sleep 0.5

#
# Delete development env file

if [ -f $ENV_DEV_FILE ]
then
    rm $ENV_DEV_FILE
    printf "Make \"${ENV_DEV_FILE}\" deleted successfully\n"
else
    printf "File \"${ENV_DEV_FILE}\" does not exists.\n"
fi

sleep 0.5


printf "\n"
