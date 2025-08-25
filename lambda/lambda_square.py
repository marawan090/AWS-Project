def handler(event , context):
    number = event.get("number", 0)
    return {"square": number * number}
