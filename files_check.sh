#!/bin/bash

# Define a function to create a .txt file containing the names of files in a folder
# with an environment-specific filename
create_txt_file_with_filenames() {
  local folder_path="$1"
  local environment_name="$2"

  # Check if the folder exists
  if [ ! -d "$folder_path" ]; then
    echo "Folder $folder_path does not exist."
    return 1
  fi

  mkdir -p data/templates

  # Create the output file name with the environment name
  output_file="data/templates/${environment_name}_filenames.txt"

  # Check if the output file already exists and delete it
  if [ -f "$output_file" ]; then
    rm "$output_file"
  fi

  # Iterate through the files in the folder and write their names to the output file
  for file_path in "$folder_path"/*; do
    # Check if the file is a regular file (not a directory)
    if [ -f "$file_path" ]; then
      # Extract the file name without extension
      file_name=$(basename -- "$file_path")
      file_name_noext="${file_name%.*}"

      # Append the file name to the output file
      echo "$file_name_noext" >> "$output_file"
    fi
  done

  echo "Function completed. File names are stored in $output_file."
}

# Call the function with the folder path and environment name as arguments
create_txt_file_with_filenames "/Users/avinashreddy/Desktop/CompareTable/green" "GREEN"
create_txt_file_with_filenames "/Users/avinashreddy/Desktop/CompareTable/uat" "UAT"
