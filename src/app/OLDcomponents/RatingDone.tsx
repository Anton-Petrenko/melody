"use client"

import { Track } from "../OLDtypes/types";
import { useContext, useState } from "react";
import { Button, Slider, Textarea } from "@nextui-org/react";
import { uploadRatingPostToDB } from "../OLDutils/DatabaseCalls";
import { UserDBContext } from "../OLDproviders/UserDBInfoProvider";
import { RatingContext } from "../OLDproviders/RatingProvider";

export default function RatingDone(
    {
        track,
        ratedSongs
    }:
    {
        track: Track,
        ratedSongs: string[]
    }
) {

    const databaseProvider = useContext(UserDBContext);
    const ratingProvider = useContext(RatingContext);

    const index = ratedSongs.indexOf(track.id);
    const placeInList = ratedSongs.length - index;
    const rating = (((index + 1) / ratedSongs.length)*10).toFixed(1);
    
    const [value, setValue] = useState("");

    async function uploadPost() {
        await uploadRatingPostToDB(databaseProvider.dbID as number, track.id, value, placeInList, rating);
        ratingProvider.setSongToRate(null);
    }

    return (
        <>
            <h3>{`It's official!`}</h3>
            <h3>{rating}</h3>
            <p>{track.name} by {track.artists.at(0)?.name} is #{placeInList} in your list!</p>
            <Slider
                hideThumb={true}
                aria-label="Character Count"
                size="sm"
                maxValue={255}
                value={value.length}
            />
            <Textarea
                isInvalid={value.length >= 255}
                variant="faded"
                placeholder="Verbalize your thoughts! (or don't)"
                errorMessage="Your post must be less than 255 characters"
                onValueChange={setValue}
            />
            <div className="w-[100%] flex justify-end">
                {
                    value.length >= 255 ?
                    <Button
                        color="primary"
                        size="sm"
                        isDisabled
                    >
                        Post
                    </Button>
                    :
                    <Button
                        color="primary"
                        size="sm"
                        onPress={() => uploadPost()}
                    >
                        Post
                    </Button>
                }
            </div>
        </>
    )
}