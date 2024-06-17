    const Categoria = require("../../lib/jasmine_examples/Player");
    const Song = require("../../lib/jasmine_examples/Song");

    describe("Categoria", function () {
    let Categoria;
    let song;

    beforeEach(function () {
        Categoria = new Categoria();
        song = new Song();
    });

    it("should be able to play a Song", function () {
        Categoria.play(song);
        expect(player.currentlyPlayingSong).toEqual(song);

        // demonstrates use of custom matcher
        expect(Categoria).toBePlaying(song);
    });

    describe("when song has been paused", function () {
        beforeEach(function () {
        Categoria.play(song);
        Categoria.pause();
        });

        it("should indicate that the song is currently paused", function () {
        expect(Categoria.isPlaying).toBeFalsy();

        // demonstrates use of 'not' with a custom matcher
        expect(Categoria).not.toBePlaying(song);
        });

        it("should be possible to resume", function () {
        Categoria.resume();
        expect(Categoria.isPlaying).toBeTruthy();
        expect(Categoria.currentlyPlayingSong).toEqual(song);
        });
    });

    // demonstrates use of spies to intercept and test method calls
    it("tells the current song if the user has made it a favorite", function () {
        spyOn(song, "persistFavoriteStatus");

        Categoria.play(song);
        Categoria.makeFavorite();

        expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    });

    //demonstrates use of expected exceptions
    describe("#resume", function () {
        it("should throw an exception if song is already playing", function () {
        Categoria.play(song);

        expect(function () {
            Categoria.resume();
        }).toThrowError("song is already playing");
        });
    });
    });
