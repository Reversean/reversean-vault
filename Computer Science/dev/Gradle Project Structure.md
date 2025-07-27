Here are some guidelines on how to structure Java/Kotlin project with Gradle tool.
# File structure

```
root
├── gradle
│   ├── libs.versions.toml
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew                             
├── gradlew.bat                         
├── settings.gradle.kts
├── buildSrc
│   ├── build.gradle.kts
│   ├── settings.gradle.kts
│   └── src
│       └── main
│           └── kotlin
│               └── conventions.gradle.kts
├── subproject
│   ├── build.gradle.kts
│   └── src
│       └── main
│           ├── java
│           ├── kotlin
│           └── resources
```

# Gradle Wrapper

Wrapper allows to download version of Gradle specified for project and invoke it in any environment with installed JDK.

Priority to use the latest version. For more comportable development experience `all` distribution type is preffered. For some optimizations `bin` type can be used (not sure).

```
gradle wrapper --gradle-version latest --distribution-type all
```

# Projects

Project is one of the core concepts of gradle. It represents some module and corresponds some component to be built (Jar, War) or some thing to be done (run, test, deploy)

Gradle build can be:

- Single-project
- Multi-project

Single-project contain single `settings.gradle.kts` file in project root directory and sources in `src` directory.

Multi-project may also contain subprojects with the same structure. This allows to develop interdependent modules and maintain them in single build.

How to include subproject in another project:

**setting.gradle.kts**
```kotlin
include("subproject-a)
include("subproject-b:core)
include("subproject-b:service)
```

To configure build logic for multiple modules `buildSrc` directory can be used. `buildSrc` will be automatically recognized by gradle as a special subproject. This may be used for storing shared gradle-build scripts.
## Conventions


# Settings File

`settings.gradle.kts` is used by gradle to initialize `Settings` instance for project during initialization phase.

Here we can:

- set project name
```kotlin
rootProject.name = "project"
```

- include subprojects
```kotlin
include("subproject)
```

- apply plugins that should be applied to `Settings`
```kotlin
plugins {
	id("some-plugin")
}
```

- define dependeny resolution strategy
```kotlin
dependencyResolutionManagement {
	versionCatalogs {
		create("libs") {
			from(files("gradle/libs.versions.toml"))
        }
	}
}
```

# Build file

`build.gradle.kts` is used by gradle during configuration phase. It allows to configure `Project`.

Here we can:

- apply plugins that should be applied to `Project`
```kotlin
plugins {
	id("some-plugin")
}
```

- define group
```kotlin
group = "com.group"
```

- define version
```kotlin
version = "0.0.1"
```

- define locations where dependencies can be found
```kotlin
repositories {
	mavenCentral()
}
```

- setup dependencies for project
```kotlin
dependencies {
	implementation("com.group:library:0.0.1")
	implementation(project(":subproject"))
}
```

- set properties
```kotlin
kotlin {
	jvmToolchain(21)
}
```

- configure tasks
```kotlin
tasks.withType<Test> {
	useJUnitPlatform()
}
```

# Version Catalogs

