#!/bin/bash

function search() {
    local search="$1"

    # has a slug, is a game (not a DLC) and matches case-insensitively the regex
    jq -ec --argjson name "${search}" '[.[] | select((.[8] != "") and (.[3] | index("addons") | not) and (.[2] | test($name; "i")?))][0]' "${epic_data_lists_json}"
}

function handle_match() {
    epic_name="$(echo "${match}" | jq -er '.[2]')"
    echo "- ${name} -> ${epic_name}"

    namespace="$(echo "${match}" | jq -er '.[1]')"

    # Remove any /home suffix
    slug="$(echo "${match}" | jq -er '.[8]' | sed 's:/home$//')"

    # Write namespace and slug back to AWACY's games.json
    jq -r --indent 4 \
        --arg namespace "${namespace}" \
        --arg name "${name}" \
        --arg slug "${slug}" \
        '[(.[] | select(.name == $name).storeIds.epic |= { "namespace": $namespace, "slug": $slug })]' \
        "${awacy_games_json}" >"${awacy_games_json}.tmp"
    mv -f "${awacy_games_json}.tmp" "${awacy_games_json}"
}

set -euo pipefail

awacy_games_json="${1}"
epic_data_lists_json="${2}"

readarray -t awacy_games < <(jq -rc '.[] | select((.storeIds.epic.namespace == null) or (.storeIds.epic.slug == null)).name' "${awacy_games_json}")

# Show titles missing namespaces or slugs
# display games which did not match
if [[ "${#awacy_games[@]}" -gt 0 ]]; then
    echo "## Titles to look for"
    echo
    for name in "${awacy_games[@]}"; do
        echo "- ${name}"
    done
    echo
fi

high_confidence_matches=()
low_confidence_matches=()
not_matches=()
echo "## Searching..."
for name in "${awacy_games[@]}"; do
    name_to_search="${name//":"/}"
    name_to_search="${name_to_search//"™"/}"
    name_to_search="${name_to_search//"®"/}"
    name_to_search="${name_to_search//","/}"
    name_to_search="${name_to_search//"-"/"[- ]"}"
    name_to_search="${name_to_search// /"[:™®,]?" }[:™®,]?"
    strict_search="\"^${name_to_search}\$\""
    loose_search="\"^${name_to_search}\""
    if match=$(search "${strict_search}"); then
        handle_match
        high_confidence_matches+=("${name} -> ${epic_name}")
    elif match=$(search "${loose_search}"); then
        handle_match
        low_confidence_matches+=("${name} -> ${epic_name}")
    else
        # save not match to a list
        not_matches+=("${name}")
    fi
done

if [[ "${#high_confidence_matches[@]}" -gt 0 ]]; then
    echo "## Games with low confidence of match:"
    echo
    for name in "${high_confidence_matches[@]}"; do
        echo "- ${name}"
    done
    echo
fi

if [[ "${#low_confidence_matches[@]}" -gt 0 ]]; then
    echo "## Games with low confidence of match"
    echo
    for name in "${low_confidence_matches[@]}"; do
        echo "- ${name}"
    done
    echo
fi

if [[ "${#not_matches[@]}" -gt 0 ]]; then
    echo "## Games which did not match"
    echo
    for name in "${not_matches[@]}"; do
        echo "- ${name}"
    done
    echo
fi
