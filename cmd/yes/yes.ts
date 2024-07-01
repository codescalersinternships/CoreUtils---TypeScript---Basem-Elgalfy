let out = "y"

if (process.argv.length > 2) {
    out = process.argv.slice(2).join(" ")
}

while (true) {
    console.log(out)
}