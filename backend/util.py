from typing import TypedDict

class MelodyUserRatings(TypedDict):
    bad: list[str]
    ok: list[str]
    good: list[str]