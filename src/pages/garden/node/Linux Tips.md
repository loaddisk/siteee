## Shell

### Don't make a non-posix (like fish) shell your default

This breaks compatibility of scripts without a shebang. Instead just set your terminal emulator to auto launch fish

### I launched a graphical process from my terminal emulator, and want to close the terminal but keep it running

```shell
^Zfish: Job 1, 'process' has stopped
$ disown
disown: job 1 ('process') was stopped and has been signalled to continue.
```

## Resources

### Using windows pagefile as swap