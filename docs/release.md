# Releasing a new version of the package

## 1 - Create a new release

Create a [new release](https://docs.github.com/en/github/administering-a-repository/releasing-projects-on-github/managing-releases-in-a-repository) for the repository from the [releases tab](https://github.com/XIVStats/lodestone/releases).

For tag version enter the desired version without the `v` (we will come back to this) against the `main` branch.

Title the release as you want, and enter a description as desired.

## 2 - Wait for the release action to execute

Creating the above release should trigger a build of the [release workflow here](https://github.com/XIVStats/lodestone/actions/workflows/release.yml).

Wait for that to complete successfully.

## 3 - Update the target of the GitHub release

Our release should have created a new tag in the repository that matches the version we entered earlier prefaced with a `v`.

Open the release you made during step 1, select "edit release" in the top right.

Select the tag, box and enter a `v` in front of the existing version. Click update release

## 4 - Delete the tag without the `v`

Go to the "tags" tab, find the tag we created during step 1, click it's name, and then click "Delete" in the top right.

Then confirm deletion.
