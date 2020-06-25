import React, { useState, useEffect } from "react";
import style from "styled-components";

const CreateVideoLabel = style.label`
  padding: 10px 15px;
  color: #44E0F6;
  font-size: 18px;
  display: block;
  font-weight: 800;
`;

const VideoButton = style.button`
  padding: 20px 30px;
  color: #0E0429;
  border-radius: 8px;
  font-size: 18px;
  display: block;
  font-weight: 800;
  width: 100%;
  margin-top: 20px;
  border: 2px solid #FCFC0B;
  cursor: pointer;
  background: rgb(250,112,239);
  background: linear-gradient(180deg, rgba(250,112,239,1) 0%, rgba(254,235,251,1) 100%, rgba(2,0,36,1) 190755%);
  &:hover {
    background: rgb(254,235,251);
    background: radial-gradient(circle, rgba(254,235,251,1) 0%, rgba(250,112,239,1) 100%, rgba(2,0,36,1) 190755%);
  }
`;

const ResetDefaults = style.button`
  width: 100%;
  text-align: center;
  font-size: 24px;
  margin: 20px 0;
  background: transparent;
  border: none;
  font-family: "Gibson Bold";
  cursor: pointer;
  color: #FF1313;
`;

const AdvancedOptions = (props) => {
  const [jitHover, setJitHover] = useState(false);
  const [deepHover, setDeepHover] = useState(false);
  const [truncateHover, setTruncateHover] = useState(false);
  const [pitchHover, setPitchHover] = useState(false);
  const [tempoHover, setTempoHover] = useState(false);
  const [smoothHover, setSmoothHover] = useState(false);

  const [videoParams, setVideoParams] = useState({
    im_group: "RANDOM OBJECTS",
    jitter: 0.5,
    depth: 1,
    truncation: 0.5,
    pitch_sensitivity: 220,
    tempo_sensitivity: 0.25,
    smooth_factor: 20,
  });

  const handleSliderChange = (event) => {
    setVideoParams({
      ...videoParams,
      [event.target.name]: Number(event.target.value),
    });
  };

  const handleReset = (event) => {
    event.preventDefault();
    setVideoParams({
      jitter: 0.5,
      depth: 1,
      truncation: 0.5,
      pitch_sensitivity: 220,
      tempo_sensitivity: 0.25,
      smooth_factor: 20,
    });
  };

  const handleJitHover = (event) => {
    setJitHover(!jitHover);
  };

  const handleDeepHover = (event) => {
    setDeepHover(!deepHover);
  };

  const handleTruncateHover = (event) => {
    setTruncateHover(!truncateHover);
  };

  const handlePitchHover = (event) => {
    setPitchHover(!pitchHover);
  };

  const handleTempoHover = (event) => {
    setTempoHover(!tempoHover);
  };

  const handleSmoothHover = (event) => {
    setSmoothHover(!smoothHover);
  };

  useEffect(() => {
    if (props.onChange) {
      props.onChange(videoParams);
    }
  }, [
    videoParams.im_group,
    videoParams.jitter,
    videoParams.depth,
    videoParams.truncation,
    videoParams.pitch_sensitivity,
    videoParams.tempo_sensitivity,
    videoParams.smooth_factor,
  ]);

  return (
    <div className="options">
      <ResetDefaults onClick={handleReset}>Reset Defaults</ResetDefaults>
      <div className="image_category">
        <CreateVideoLabel>
          Image Category
          <select
            onChange={(event) =>
              setVideoParams({
                ...videoParams,
                im_group: event.target.value,
              })
            }
          >
            <option value="RANDOM OBJECTS">Pick One</option>
            <option value="FISH">FISH</option>
            <option value="BIRDS">BIRDS</option>
            <option value="AMPHIBIANS">AMPHIBIANS</option>
            <option value="LIZARDS">LIZARDS</option>
            <option value="SNAKES">SNAKES</option>
            <option value="OCTOPED">OCTOPED</option>
            <option value="EXOTIC BIRDS">EXOTIC BIRDS</option>
            <option value="WEIRD MAMMALS">WEIRD MAMMALS</option>
            <option value="SQUISHY SEA CREATURES">SQUISHY SEA CREATURES</option>
            <option value="SHELLED SEA CREATURES">SHELLED SEA CREATURES</option>
            <option value="FANCY BIRDS">FANCY BIRDS</option>
            <option value="SEA MAMMALS">SEA MAMMALS</option>
            <option value="UGLY DOGS">UGLY DOGS</option>
            <option value="HOUND DOGS">HOUND DOGS</option>
            <option value="TERRIER DOGS">TERRIER DOGS</option>
            <option value="RETRIEVER DOGS">RETRIEVER DOGS</option>
            <option value="RANDOM DOGS">RANDOM DOGS</option>
            <option value="WOLVES">WOLVES</option>
            <option value="HYAENAS">HYAENAS</option>
            <option value="FOXY">FOXY</option>
            <option value="DOMESTIC CATS">DOMESTIC CATS</option>
            <option value="BIG CATS">BIG CATS</option>
            <option value="BEAR">BEAR</option>
            <option value="UNDERGROUND CATS">UNDERGROUND CATS</option>
            <option value="BEETLES">BEETLES</option>
            <option value="FLYING INSECTS">FLYING INSECTS</option>
            <option value="BUTTERFLIES">BUTTERFLIES</option>
            <option value="SHARP SEA STUFF">SHARP SEA STUFF</option>
            <option value="SMALL MAMMALS">SMALL MAMMALS</option>
            <option value="LARGE WILD ANIMALS">LARGE WILD ANIMALS</option>
            <option value="RANDOM MAMMALS">RANDOM MAMMALS</option>
            <option value="PRIMATES">PRIMATES</option>
            <option value="AFRICAN ANIMALS">AFRICAN ANIMALS</option>
            <option value="PANDAS">PANDAS</option>
            <option value="CRAZY SEA CREATURES">CRAZY SEA CREATURES</option>
            <option value="RANDOM OBJECTS">RANDOM OBJECTS</option>
            <option value="WORDS AND SIGNS">WORDS AND SIGNS</option>
            <option value="FOOD STUFF">FOOD STUFF</option>
            <option value="GEOLOGICAL STUFF">GEOLOGICAL STUFF</option>
            <option value="PEOPLE">PEOPLE</option>
            <option value="FLOWERING THINGS">FLOWERING THINGS</option>
            <option value="FUNGI">FUNGI</option>
            <option value="TOILET PAPER">TOILET PAPER</option>
          </select>
        </CreateVideoLabel>
      </div>
      <div className="jitter">
        <CreateVideoLabel>
          Jitter
          <div onMouseEnter={handleJitHover} onMouseLeave={handleJitHover}>
            ?
          </div>
          {jitHover && (
            <div>
              Prevents the same exact images from cycling repetitively during
              repetitive music so that the video output is more interesting. If
              you do want to cycle repetitively, set jitter to minimum.
            </div>
          )}
          <input
            type="range"
            name="jitter"
            min={0}
            max={1}
            step="0.05"
            value={videoParams.jitter}
            onChange={handleSliderChange}
          />
        </CreateVideoLabel>
      </div>
      <div className="depth">
        <CreateVideoLabel>
          Depth
          <div onMouseEnter={handleDeepHover} onMouseLeave={handleDeepHover}>
            ?
          </div>
          {deepHover && (
            <div>
              Max yields more thematically rich content. Lowering yields more
              'deep' structures like human and dog faces. However, this depends
              heavily on the specific classes you are using.
            </div>
          )}
          <input
            type="range"
            name="depth"
            min={0.1}
            max={1}
            step="0.05"
            value={videoParams.depth}
            onChange={handleSliderChange}
          />
        </CreateVideoLabel>
      </div>
      <div className="truncation">
        <CreateVideoLabel>
          Truncation
          <div
            onMouseEnter={handleTruncateHover}
            onMouseLeave={handleTruncateHover}
          >
            ?
          </div>
          {truncateHover && (
            <div>
              Controls the variability of images generated. Max value yield more
              variable images, while lower values yield simpler images with more
              recognizable, normal-looking objects.
            </div>
          )}
          <input
            type="range"
            name="truncation"
            min={0.1}
            max={1}
            step="0.05"
            value={videoParams.truncation}
            onChange={handleSliderChange}
          />
        </CreateVideoLabel>
      </div>
      <div className="pitch">
        <CreateVideoLabel>
          Pitch Sensitivity
          <div onMouseEnter={handlePitchHover} onMouseLeave={handlePitchHover}>
            ?
          </div>
          {pitchHover && (
            <div>
              Controls how rapidly the thematic content of the video will react
              to changes in pitch.
            </div>
          )}
          <input
            type="range"
            name="pitch_sensitivity"
            min={200}
            max={295}
            step="5"
            value={videoParams.pitch_sensitivity}
            onChange={handleSliderChange}
          />
        </CreateVideoLabel>
      </div>
      <div className="tempo">
        <CreateVideoLabel>
          Tempo Sensitivity
          <div onMouseEnter={handleTempoHover} onMouseLeave={handleTempoHover}>
            ?
          </div>
          {tempoHover && (
            <div>
              Controls how rapidly the overall size, position, and orientation
              of objects in the images will react to changes in volume and
              tempo.{" "}
            </div>
          )}
          <input
            type="range"
            name="tempo_sensitivity"
            min={0.05}
            max={0.8}
            step="0.05"
            value={videoParams.tempo_sensitivity}
            onChange={handleSliderChange}
          />
        </CreateVideoLabel>
      </div>
      <div className="smooth">
        <CreateVideoLabel>
          Smooth Factor
          <div
            onMouseEnter={handleSmoothHover}
            onMouseLeave={handleSmoothHover}
          >
            ?
          </div>
          {smoothHover && (
            <div>
              Small local fluctuations in pitch can cause the video frames to
              fluctuate back and forth. If you want to visualize very fast music
              with rapid changes in pitch, lower the smooth factor.
            </div>
          )}
          <input
            type="range"
            name="smooth_factor"
            min={10}
            max={30}
            step="1"
            value={videoParams.smooth_factor}
            onChange={handleSliderChange}
          />
        </CreateVideoLabel>
      </div>
    </div>
  );
};

export default AdvancedOptions;
