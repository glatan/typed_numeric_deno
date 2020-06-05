#! /usr/bin/env bash

declare -a TEMPLATES="$(ls ./doc/*/template/*.md.template.sh)"

test() {
    [[ -e '.cache' ]] && echo '.cache/ already exists' && exit 1 || mkdir .cache
    for template in ${TEMPLATES[*]}; do
        unset METHODS STATIC_METHODS
        source "${template}"
        for name in ${!METHODS[*]}; do
            echo "${METHODS[${name}]}" > ".cache/${MODULE_NAME}.prototype.${name}.ts"
            deno run ".cache/${MODULE_NAME}.prototype.${name}.ts"
        done
        for name in ${!STATIC_METHODS[*]}; do
            echo "${STATIC_METHODS[${name}]}" > ".cache/${MODULE_NAME}.${name}.ts"
            deno run ".cache/${MODULE_NAME}.${name}.ts"
        done
    done
    rm -r .cache
}

generate() {
    for template in ${TEMPLATES[*]}; do
        unset METHODS STATIC_METHODS
        source "${template}"
        _filename=".$(echo ${template} | awk -F '.' '{print $2}').md"
        [[ -e "${_filename}" ]] || touch "${_filename}"
        echo "# ${MODULE_NAME}" > "${_filename}"
        if [[ "${#METHODS[@]}" -ne "0" ]]; then
            # sort method
            original_ifs="${IFS}"
            IFS=$'\n'
            declare -a SORTED_NAMES=($(sort <<<"${!METHODS[*]}"))
            IFS="${original_ifs}"
            echo >> "${_filename}"
            echo "## Methods" >> "${_filename}"
            for name in ${SORTED_NAMES[*]}; do
                echo >> "${_filename}"
                echo "### ${name}" >> "${_filename}"
                echo >> "${_filename}"
                echo -n '```ts' >> "${_filename}"
                echo -n "${METHODS[${name}]}" >> "${_filename}"
                echo -n '```' >> "${_filename}"
            done
            echo >> "${_filename}"
        fi
        if [[ "${#STATIC_METHODS[@]}" -ne "0" ]]; then
            # sort static method
            original_ifs="${IFS}"
            IFS=$'\n'
            declare -a SORTED_NAMES=($(sort <<<"${!STATIC_METHODS[*]}"))
            IFS="${original_ifs}"
            echo >> "${_filename}"
            echo "## Static Methods" >> "${_filename}"
            for name in ${SORTED_NAMES[*]}; do
                echo >> "${_filename}"
                echo "### ${name}" >> "${_filename}"
                echo >> "${_filename}"
                echo -n '```ts' >> "${_filename}"
                echo -n "${STATIC_METHODS[${name}]}" >> "${_filename}"
                echo -n '```' >> "${_filename}"
            done
            echo >> "${_filename}"
        fi
    done
}

test
generate
